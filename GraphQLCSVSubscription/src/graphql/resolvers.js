import Papa from 'papaparse'
import fetch from 'node-fetch'

// https://stackoverflow.com/questions/47823288/parse-remote-csv-file-using-nodejs-papa-parse
const papaOptions = { header: true }
const parseStream = Papa.parse(Papa.NODE_STREAM_INPUT, papaOptions)
parseStream.on('data', chunk => {
    console.log(chunk)
})
parseStream.on('finish', () => {
    console.log('streaming done')
})

export const resolvers = {
    Query: {
        hello: () => "First GraphQL project 🥳",
        csvData: async () => {                
            await fetch('http://localhost:8080/test.csv')
                .then(res => {
                    res.body.pipe(parseStream)
                })
            return []
        }
    }
}
