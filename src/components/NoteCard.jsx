import React from "react";
import {
  Card,
  Textarea,
  Group,
  ActionIcon,
  Text,
  Box,
} from "@mantine/core";
import {
  IconArrowLeft,
  IconArrowRight,
  IconTrash,
} from "@tabler/icons-react";

export default function NoteCard({
  note,
  noteIndex,
  totalNotes,
  onPrev,
  onNext,
  onDelete,
  onChange,
  onAddNewNote, 
}) {
  const handleNext = () => {
    if (noteIndex < totalNotes - 1) {
      onNext();
    } else {
      onAddNewNote(); 
    }
  };

  return (
    <Card
      radius="md"
      shadow="sm"
      withBorder
      padding={0}
      style={{ overflow: "hidden"}}
    >
      <Box bg="orange.3" py="xs" px="sm">
        <Group justify="space-between" align="center">
          <Group gap="xs">
            <ActionIcon
              variant="light"
              radius="xl"
              color="gray"
              onClick={onPrev}
              disabled={noteIndex === 0}
              style={{ cursor: noteIndex === 0 ? "not-allowed" : "pointer" }}
            >
              <IconArrowLeft size={16} />
            </ActionIcon>

            <ActionIcon
              variant="light"
              radius="xl"
              color="gray"
              onClick={handleNext}
              style={{ cursor: "pointer" }}
            >
              <IconArrowRight size={16} />
            </ActionIcon>
          </Group>

          <Text fw={500} size="lg">
            Note {noteIndex + 1}
          </Text>

          <ActionIcon
            variant="light"
            radius="xl"
            color="red"
            onClick={onDelete}
            style={{ cursor: "pointer" }}
          >
            <IconTrash size={16} />
          </ActionIcon>
        </Group>
      </Box>

      <Box p="sm" bg="gray.0">
        <Textarea
          value={note}
          onChange={(e) => onChange(e.currentTarget.value)}
          autosize
          minRows={6}
          variant="unstyled"
          size="md"
          style={{
            fontFamily: "Georgia, serif",
            fontSize: "1.1rem",
          }}
        />
      </Box>
    </Card>
  );
}
