import { render, fireEvent, screen } from '../../test_setup/test-utils';
import React from 'react'
import Dashboard from './home'
import renderer from "react-test-renderer"


it("check button render", () => {
    const { queryByTestId } = render(<Dashboard/>)

    const createBotBtn = queryByTestId("create-bot")
    const addBotBtn = queryByTestId("add-bot")

    expect(createBotBtn).toBeTruthy()
    expect(addBotBtn).toBeTruthy()
})

it("buttons with correct name", () => {
    const { queryByTestId } = render(<Dashboard/>)

    const createBotBtn = queryByTestId("create-bot")
    const addBotBtn = queryByTestId("add-bot")

    expect(createBotBtn.textContent).toBe("Create new bot")
    expect(addBotBtn.textContent).toBe("Add Bot")
})

it("matches snapshot", () => {
    const tree = renderer.create(<Dashboard/>).toJSON()

    expect(tree).toMatchSnapshot()
})

