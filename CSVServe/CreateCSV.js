const { createWriteStream } = require('fs')
const { unparse } = require('papaparse')
const faker = require('faker')

const writeStream = createWriteStream(`${__dirname}/public/test.csv`)

// https://stackoverflow.com/questions/46671199/how-to-add-1-utc-day-to-javascript-date
const MS_IN_MINUTE = 60 * 1000
const NUMBER_OF_ROWS = 1000000

function* makeDate(start=1, end=NUMBER_OF_ROWS, step=1) {
    let iterationCount = 0
    for (let i = start; i < end; i+= step) {
        iterationCount++
        yield new Date(i * MS_IN_MINUTE)
    }
    return iterationCount
}

const dateIterator = makeDate()

function getData() {
    const data = []
    for (const date of dateIterator) {
        data.push({
            date,
            value: (Math.random() * 100).toFixed(2),
            name: faker.name.findName(),
            email: faker.internet.email(),
            address: faker.address.streetAddress(),
        })
    }
    return data
}

(async () => {
    console.log('Creating fake data...')
    const data = await getData()
    console.log('Creating Done')
    console.log('Parsing to csv...')
    const csv = await unparse(data)
    console.log('Parsing done')
    console.log('Writing to file...')
    await writeStream.write(csv)
    console.log(`Writing done 🚀 you're good to go`)
})()
