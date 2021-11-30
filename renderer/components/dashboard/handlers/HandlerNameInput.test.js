import { render, fireEvent, screen } from '../../../../test_setup/test-utils';
import React from 'react'
import HandlerNameInput from '../handlers/HandlerNameInput';
import { DashboardProvider } from '../DashboardContext';

jest.mock('react-bootstrap', () => ({
    ...jest.requireActual('react-bootstrap'),
    FormControl: jest.fn(() => <input data-testid="mocked-input-field" type="text" id="floatingInputGrid" class="form-control" value="testValue"></input>)
}))


it("input field test", () => {
    const {container, getByTestId, } = render(
        <DashboardProvider>
            <HandlerNameInput/>
        </DashboardProvider>
    )

    const inputField = getByTestId("mocked-input-field")

    expect(inputField).toBeTruthy()

    expect(inputField.value).not.toBe("")

    expect(inputField.value).toBe("testValue")
    expect(inputField.type).toBe("text")

    fireEvent.change(inputField, { target: { value: 'test' }})

    expect(inputField.value).toBe('testValue')

})