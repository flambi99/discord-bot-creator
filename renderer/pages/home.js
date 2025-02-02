import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Spinner,
} from "react-bootstrap";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import electron from "electron";
import { useRouter } from "next/router";
import path from "path";

const ipcRenderer = electron.ipcRenderer || false;

export const getName1 = (folder) => {
  folder = folder || "";
  return folder.split(path.sep).pop();
};

export default function Dashboard() {
  const [folders, setFolders] = useState("");
  const [isOpeningFolder, setIsOpeningFolder] = useState("");
  const isValidating = false;
  const router = useRouter();

  // Can be used to create a bot
  const setSettings = (folder) => (e) => {
    e.preventDefault();
    console.log(folder);
    window._folder = folder;
    setIsOpeningFolder(folder);
    ipcRenderer.send("chooseDirectory", folder);
    ipcRenderer.once("chooseDirectory", () => {
      console.log("Response arrived for sure");
      router.push(`/dashboard`);
      setIsOpeningFolder("");
    });
  };

  function pickFolder() {
    ipcRenderer.send("directoryDialog");
  }

  /* useEffect(() => {
    ipcRenderer.on("directoryDialog", (event, folder) => {
      if (!folder) return;
      setFolders([...folders, folder]);
    });

    ipcRenderer.on("getLastDirectories", (event, folders) => {
      setFolders(folders);
    });

    ipcRenderer.send("getLastDirectories");
    return () => {
      ipcRenderer.removeAllListeners("directoryDialog");
      ipcRenderer.removeAllListeners("getLastDirectory");
    };
  }, [JSON.stringify(folders)]); */

  const createBot = () => {
    ipcRenderer.send("directoryDialog");
  };

  const getName = (folder) => {
    folder = folder || "";
    return folder.split(path.sep).pop();
  };

  return (
    <>
      {isValidating ? (
        <Container className="d-flex align-items-center justify-content-center">
          <Spinner animation="border" />
        </Container>
      ) : (
        <>
          <Head>
            <title data-testid="header" >DBC | Dashboard</title>
          </Head>
          <Container className="mt-4">
            <Row className="align-items-stretch">
              {folders?.[0] &&
                folders.map((folder) => (
                  <Col key={folder} md={6}>
                    <Card className="p-3 m-3">
                      <h3 className="mb-4">{getName(folder)}</h3>
                      <p className="mb-2 text-muted">{folder}</p>
                      <Button onClick={setSettings(folder)} variant="secondary">
                        Open{" "}
                        {isOpeningFolder === folder ? (
                          <Spinner animation="border" size="sm" />
                        ) : null}
                      </Button>
                    </Card>
                  </Col>
                ))}
              <Form>
                <Button type="submit" onClick={createBot} className="mx-3 mt-3" data-testid="create-bot">
                  Create new bot
                </Button>
                <Button onClick={pickFolder} className="mt-3" data-testid="add-bot">
                  Add Bot
                </Button>
              </Form>
            </Row>
          </Container>
        </>
      )}
    </>
  );
}
