import { render, fireEvent, screen } from '../../test_setup/test-utils';
import React from 'react'
import Dashboard from './home'
import renderer from "react-test-renderer"


it("buttonRendersCorrectly", () => {
    const { queryByTestId } = render(<Dashboard/>)

    const createBotBtn = queryByTestId("create-bot")
    const addBotBtn = queryByTestId("add-bot")

    expect(createBotBtn).toBeTruthy()
    expect(addBotBtn).toBeTruthy()
})

it("button renders with correct name", () => {
    const { queryByTestId } = render(<Dashboard/>)

    const createBotBtn = queryByTestId("create-bot")
    const addBotBtn = queryByTestId("add-bot")

    expect(createBotBtn.textContent).toBe("Create new bot")
    expect(addBotBtn.textContent).toBe("Add Bot")
})

it("snapshot match test", () => {
    const tree = renderer.create(<Dashboard/>).toJSON()

    expect(tree).toMatchSnapshot()
})

