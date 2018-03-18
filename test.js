/* eslint-env jest */
const axios = require('axios')
const Meetup = require('./meetup')

let response = {
  data: [
    {
      response: 'yes',
      member: {
        name: 'Rick Sanchez'
      }
    },
    {
      response: 'yes',
      member: {
        name: 'Morty'
      }
    }
  ],
  status: 200
}

jest.mock('axios')

axios.get.mockResolvedValue(response)

test('got an array of confirmed members', async () => {
  const mt = new Meetup('eventId', 'backend-br', '123')
  const confirmedMembers = await mt.getConfirmedMembers()

  expect(confirmedMembers).toEqual(expect.arrayContaining(['Morty']))
})

test('got a winner', async () => {
  const mt = new Meetup('eventId', 'backend-br', '123')

  let arr = await mt.getConfirmedMembers()
  let winner = mt.getWinner(arr)

  expect(winner).toMatch(/^/)
})
