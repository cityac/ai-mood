import { ChatOpenAI } from '@langchain/openai'
import { StructuredOutputParser } from 'langchain/output_parsers'
import z from 'zod'
import { PromptTemplate } from '@langchain/core/prompts'

console.log('BINGO', process.env)

const schema = z.object({
  mood: z.string().describe('the mood of the person who wrote the journal entry.'),
  summary: z.string().describe('quick summary of the entire entry.'),
  subject: z.string().describe('the subject of the journal entry.'),
  color: z
    .string()
    .describe(
      'a hexidecimal color code that represents the mood of the entry. Example #0101fe for blue representing happiness.',
    ),
  negative: z.boolean().describe('is the journal entry nagative? (i.e. does it contain negative emotions?).'),
})

const parser = StructuredOutputParser.fromZodSchema(schema)

export const analyse = async (content) => {
  console.log('Call analyse')
  const input = await getPrompt(content)
  const model = new ChatOpenAI({
    temperature: 0.9,
    model: 'gpt-4o',
  })
  const result = await model.invoke(input)

  try {
    return parser.parse(result.content as string)
  } catch (e) {
    console.log('Error', e)
  }
}

const getPrompt = async (content) => {
  const format_instructions = parser.getFormatInstructions()
  const prompt = new PromptTemplate({
    template:
      'analyse the following hournal entry, Follow the instructions and format your response to match the format instructions, no matter what! \n {format_instructions}\n{entry}',
    inputVariables: ['entry'],
    partialVariables: { format_instructions },
  })

  const input = await prompt.format({
    entry: content,
  })

  console.log('input')
  console.log(input)
  return input
}
