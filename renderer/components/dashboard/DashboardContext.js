import { ipcRenderer } from "electron";
<<<<<<< Updated upstream:renderer/components/dashboard/DashboardContext.js
import { createContext, useContext, useEffect, useState } from "react";
=======
import {
  Context,
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
>>>>>>> Stashed changes:renderer/components/dashboard/DashboardContext.tsx
import useActions from "../../lib/useActions";
import useCommands from "../../lib/useCommands";
import useEvents from "../../lib/useEvents";
import useSettings from "../../lib/useSettings";
import { useModeContext } from "./ModeContext";

<<<<<<< Updated upstream:renderer/components/dashboard/DashboardContext.js
const DashboardContext = createContext(null);
=======
type Action = {
  name: string;
};

type Handler = {
  name: string;
  actions: Action[];
};

type Dashboard = {
  events?: Handler[];
  commands?: Handler[];
  actionSchemas: [];
  actionModalVisible: boolean;
  handlerIndex: number;
  actionIndex: number;
  errors: any[];
  handlers?: Handler[];
  actionSchema?: any;
};
type ReorderAction = (from: number, to: number) => void;
type UpdateHandlerIndex = (index: number) => void;
type RemoveAction = (index: number) => void;
type AddHandler = (handler?: Handler) => void;

type Functions = {
  reorderAction?: ReorderAction;
  updateHandlerIndex?: UpdateHandlerIndex;
  removeAction?: RemoveAction;
  addHandler?: AddHandler;
};

type DashboardContextValue = Dashboard & Functions;

export const DashboardContext = createContext(
  {}
) as Context<DashboardContextValue>;
>>>>>>> Stashed changes:renderer/components/dashboard/DashboardContext.tsx

export function useDashboardContext() {
  return useContext<DashboardContextValue>(DashboardContext);
}

export function DashboardProvider({ children }) {
  const [actionSchemas] = useActions();
  let [events, setEvents] = useEvents();
  let [commands, setCommands] = useCommands();
  const [settings] = useSettings();
  const [mode] = useModeContext();

<<<<<<< Updated upstream:renderer/components/dashboard/DashboardContext.js
  const [state, setState] = useState({
    actionSchemas: actionSchemas,
    mode: "command",
=======
  const [state, setState] = useState<Dashboard>({
    actionSchemas,
>>>>>>> Stashed changes:renderer/components/dashboard/DashboardContext.tsx
    actionModalVisible: false,
    commands,
    events,
    handlerIndex: 0,
    actionIndex: 0,
    errors: [],
  });

  useEffect(() => {
    ipcRenderer?.on("onErrorsUpdate", (_event, error) => {
      console.log("Here");
      console.log("Here is the error", error);
      setState((state) => ({ ...state, errors: [...state.errors, error] }));
    });
    return () => {
      ipcRenderer.removeAllListeners("onErrorsUpdate");
    };
  }, [JSON.stringify(state.errors)]);

  useEffect(() => {
    if (!commands || !events) return;
    setState({ ...state, commands, events });
  }, [JSON.stringify(commands), JSON.stringify(events)]);

  useEffect(() => {
    // The last context we had here will be used on the save call
    ipcRenderer?.on("save", () => {
      save();
    });

    return () => {
      ipcRenderer?.removeAllListeners("save");
    };
  }, [JSON.stringify(state.commands), JSON.stringify(state.events)]);

  useEffect(() => {
    if (!actionSchemas) return;
    setState({ ...state, actionSchemas });
  }, [JSON.stringify(actionSchemas)]);

<<<<<<< Updated upstream:renderer/components/dashboard/DashboardContext.js
  const handlers =
    (state.mode === "event" ? state.events : state.commands) || [];
  const handler = handlers[state.handlerIndex] || {};
  const actions = handler.actions || [];
=======
  const handlers = (mode === "event" ? state.events : state.commands) || [];
  const handler = handlers[state.handlerIndex] || { actions: [] };
  const actions = handler.actions;
>>>>>>> Stashed changes:renderer/components/dashboard/DashboardContext.tsx
  const action = actions[state.actionIndex] || {};
  const actionSchema =
    actionSchemas?.find(({ name }) => action.name === name) || {};

<<<<<<< Updated upstream:renderer/components/dashboard/DashboardContext.js
  /**
   * @param {string} mode
   */
  const updateMode = (mode) => {
    setState({ ...state, mode, actionIndex: 0, handlerIndex: 0 });
  };

  /**
   * Select new handler
   * @param {number} index
   */
  const updateHandlerIndex = (index) => {
    let newIndex;
=======
  const updateHandlerIndex: UpdateHandlerIndex = (index) => {
    let newIndex: number;
>>>>>>> Stashed changes:renderer/components/dashboard/DashboardContext.tsx

    if (handlers[index]) {
      newIndex = index;
    } else if (handlers.length < 1) {
      // Reset if there are no actions
      newIndex = 0;
    } else {
      // Set index to last item
      newIndex = handlers.length - 1;
    }

    setState({ ...state, handlerIndex: newIndex });
  };

  /**
   * Updates selected handler
   * @param {object} handler
   */
  const updateHandler = (newHandler) => {
    Object.assign(handler, newHandler);
    setState({ ...state });
  };

  /**
   * Adds a new handler
   * @param {object} handler
   */
  const addHandler = (newHandler) => {
    const template = {
      name: "NewCommand",
      permissions: "NONE",
      restriction: "1",
      actions: [],
    };
    newHandler = Object.assign(template, newHandler);

    handlers.push(newHandler);
    setState({ ...state });
  };

  /**
   * Remove handler
   * @param {number} index
   */
  const removeHandler = (index) => {
    handlers.splice(index, 1);
    setState({ ...state });
  };

  /**
   * Updates selected action
   * @param {number} index - Index of the action
   * @return {undefined}
   */
  const updateActionIndex = (index) => {
    let newIndex;

    if (actions[index]) {
      newIndex = index;
    } else if (actions.length < 1) {
      // Reset if there are no actions
      newIndex = 0;
    } else {
      // Set index to last item
      newIndex = actions.length - 1;
    }

    setState((prevState) => ({ ...prevState, actionIndex: newIndex }));
  };

  /**
   * Updates selected action
   * @param {object} action - Action object
   * @return {undefined}
   */
  const updateAction = (newAction, merge = true) => {
    if (merge) {
      Object.assign(action, newAction);
      setState({ ...state });
    } else {
      actions[state.actionIndex] = newAction;
      setState({ ...state });
    }
  };

  /**
   * Adds a new action
   * @param {object} action - Action object
   * @return {undefined}
   */
  const addAction = (action) => {
    action = action || {};
    // actionSchemas[0] is this strange wrexdiv
    const actionSchema =
      actionSchemas.find(({ name }) => name === action.name) ||
      actionSchemas[1];

    action.name = actionSchema.name;

    for (const key of actionSchema.fields) {
      action[key] = "";
    }
    console.log(action);

    actions.push(action);
    setState({ ...state });
  };

  /**
   * Removes an action
   * @param {number} index - Index of the action
   * @return {undefined}
   */
  const removeAction = (index) => {
    actions.splice(index, 1);
    setState({ ...state });
  };

  /**
   * Reorder action
   * @param {number} to - Destination index
   */
  const reorderAction = (from, to) => {
    const [removed] = actions.splice(from, 1);
    actions.splice(to, 0, removed);

    setState({ ...state });
  };

  const hideActionModal = () => {
    setState({ ...state, actionModalVisible: false });
  };

  const showActionModal = () => {
    setState((prevState) => ({ ...prevState, actionModalVisible: true }));
  };

  const save = () => {
    setCommands(state.commands);
    setEvents(state.events);
    if (!settings?.autoRestart) {
      ipcRenderer.emit("saved");
    } else {
      ipcRenderer.send("onBotRun");
      ipcRenderer.once("onBotRun", () => {
        ipcRenderer.emit("saved");
      });
    }

    setState({ ...state, errors: [] });
  };

  return (
    <DashboardContext.Provider
      value={{
        handlers,
        handler,
        actions: actions,
        action,
        ...state,
<<<<<<< Updated upstream:renderer/components/dashboard/DashboardContext.js
        updateMode,
        hideActionModal,
        showActionModal,
        addHandler,
        removeHandler,
        updateHandler,
        updateHandlerIndex,
        addAction,
        removeAction,
        updateAction,
        updateActionIndex,
        reorderAction,
=======
        reorderAction,
        updateHandlerIndex,
        removeAction,
        addHandler,
>>>>>>> Stashed changes:renderer/components/dashboard/DashboardContext.tsx
        actionSchema,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}
