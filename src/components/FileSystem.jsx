import { useState } from "react";
import {
  Box,
  Button,
  Modal,
  TextInput,
  List,
  Group,
  Text,
} from "@mantine/core";
import { useFileSystem } from "../hooks/useFileSystem";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export default function FileSystem() {
  const {
    files,
    selectedFile,
    createFile,
    updateFileContent,
    deleteFile,
    setSelectedFile,
  } = useFileSystem();

  const [opened, setOpened] = useState(false);
  const [fileName, setFileName] = useState("");

  // создаём редактор TipTap
  const editor = useEditor({
    extensions: [StarterKit],
    content: selectedFile?.content || "",
    onUpdate: ({ editor }) => {
      if (selectedFile) {
        updateFileContent(selectedFile.id, editor.getHTML());
      }
    },
  });

  return (
    <Box p="md">
      <Group mb="md">
        <Button onClick={() => setOpened(true)}>Создать файл</Button>
        {selectedFile && (
          <Button color="red" onClick={() => deleteFile(selectedFile.id)}>
            Удалить файл
          </Button>
        )}
      </Group>

      <List spacing="xs" mb="md">
        {files.map((file) => (
          <List.Item
            key={file.id}
            onClick={() => {
              setSelectedFile(file);
              editor?.commands.setContent(file.content); // загружаем содержимое
            }}
            style={{
              cursor: "pointer",
              fontWeight: selectedFile?.id === file.id ? "bold" : "normal",
            }}
          >
            {file.name}
          </List.Item>
        ))}
      </List>

      {selectedFile ? (
        <Box>
          <Text fw={500} mb="sm">
            {selectedFile.name}
          </Text>
          <EditorContent editor={editor} className="border rounded p-2" />
        </Box>
      ) : (
        <Text c="dimmed">Выберите файл или создайте новый</Text>
      )}

      <Modal opened={opened} onClose={() => setOpened(false)} title="Новый файл">
        <TextInput
          label="Название файла"
          value={fileName}
          onChange={(e) => setFileName(e.currentTarget.value)}
        />
        <Button
          mt="md"
          onClick={() => {
            if (fileName.trim()) {
              createFile(fileName.trim());
              setFileName("");
              setOpened(false);
            }
          }}
        >
          Создать
        </Button>
      </Modal>
    </Box>
  );
}
