import { render, fireEvent, screen } from '../../../../test_setup/test-utils';
import React from 'react'
import DashboardWindowHeader from './CommandHeader'
import { DashboardProvider } from "../DashboardContext";
import HandlerNameInput from '../handlers/HandlerNameInput';

it("form renders correctly", () => {
    const { queryByTestId } = render(
        <DashboardProvider>
            <DashboardWindowHeader/>
        </DashboardProvider>
    )

    const form = queryByTestId("form-test")

    expect(form).toBeTruthy()
})

it("form label renders with correct name", () => {
    const { queryByTestId } = render(
        <DashboardProvider>
            <DashboardWindowHeader/>
        </DashboardProvider>
    )

    const label = queryByTestId("label-name")

    expect(label.textContent).toBe("Command Type")

})

it("input field renders correctly", () => {
    const { queryByTestId } = render(
        <DashboardProvider>
            <DashboardWindowHeader/>
        </DashboardProvider>
    )

    const inputField = queryByTestId("inputField")

    expect(inputField).toBeTruthy()
})

it("input field onChange", () => {
    const { queryByTestId } = render(
        <DashboardProvider>
            <DashboardWindowHeader/>
        </DashboardProvider>
    )

    const input = queryByTestId("inputField")

    fireEvent.change(input, { target: { value: "testValue"} })

    expect(input.value).toBe("testValue")
})

it("dropdown renders correctly", () => {
    const { queryByTestId } = render(
        <DashboardProvider>
            <DashboardWindowHeader/>
        </DashboardProvider>
    )

    const dropDown = queryByTestId("form-select")

    expect(dropDown).toBeTruthy()
})

it("dropdown renders correctly", () => {
    const { queryByTestId } = render(
        <DashboardProvider>
            <DashboardWindowHeader/>
        </DashboardProvider>
    )

    const dropDown = queryByTestId("form-select")

    expect(dropDown).toBeTruthy()
})

it("dropdown renders with correct option selected", () => {
    const { getAllByTestId } = render(
        <DashboardProvider>
            <DashboardWindowHeader/>
        </DashboardProvider>
    )

    let options = getAllByTestId('select-option')
    expect(options[0].selected).toBeTruthy()
    expect(options[0].textContent).toBe("Normal Command")
});

it("dropdown correct options", () => {
    const { getAllByTestId } = render(
        <DashboardProvider>
            <DashboardWindowHeader/>
        </DashboardProvider>
    )

    let options = getAllByTestId('select-option')
    expect(options[0].textContent).toBe("Normal Command")
    expect(options[1].textContent).toBe("Includes Word")
    expect(options[2].textContent).toBe("Matches Regular Expression")
    expect(options[3].textContent).toBe("Any Message")
});

it("dropdown change test", () => {
    const { queryByTestId, getAllByTestId } = render(
        <DashboardProvider>
            <DashboardWindowHeader/>
        </DashboardProvider>
    )

    //change 1st
    fireEvent.change(queryByTestId('form-select'), { target: { value: 2 }})

    let options = getAllByTestId('select-option')
    expect(options[0].selected).toBeFalsy()
    expect(options[1].selected).toBeFalsy()
    expect(options[2].selected).toBeTruthy()
    expect(options[3].selected).toBeFalsy()

    //change 2nd

    fireEvent.change(queryByTestId('form-select'), { target: { value: 3 }})

    expect(options[0].selected).toBeFalsy()
    expect(options[1].selected).toBeFalsy()
    expect(options[2].selected).toBeFalsy()
    expect(options[3].selected).toBeTruthy()
});

/* , () => () => <div class="form-floating"><input data-testid="inputField" type="text" id="floatingInputGrid" class="form-control" value=""/><label for="floatingInputGrid">Name</label></div> */

it("test", async () => {
    const { container, getByText, getByTestId, queryByTestId } = render(
        <DashboardProvider children={jest.fn()}>
            <DashboardWindowHeader/>
        </DashboardProvider>
    )

    console.log(container.outerHTML)
})