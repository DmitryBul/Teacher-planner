import { useState } from "react";
import { Flex, Box, Button, Text } from "@mantine/core";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import NoteCard from "../components/NoteCard"; 
import { useNotes } from "../hooks/useNotes"; 

const MainPage = () => {
  const [value, onChange] = useState(new Date());

  const {
    notes,
    currentIndex,
    note,
    goToPrev,
    goToNext,
    deleteCurrentNote,
    addNote,
    updateNote,
  } = useNotes();

  return (
    <div
      style={{
        marginTop: "20px",
        padding: "16px",
        height: "98vh",
        width: "100vw",
        boxSizing: "border-box",
      }}
    >
      <Flex
        mih="100%"
        gap="sm"
        justify="space-between"
        align="stretch"
        direction="row"
        wrap="nowrap"
      >
        <Flex w="25%" direction="column" gap="sm">
          <Box flex={1} style={{ borderRadius: 8 }}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Calendar
                onChange={onChange}
                value={value}
                style={{ width: "100%", border: "none" }}
                
              />
            </div>
          </Box>

          <Box flex={1} style={{ borderRadius: 8 }}>
            {notes.length > 0 ? (
              <NoteCard
                note={note}
                noteIndex={currentIndex}
                totalNotes={notes.length}
                onPrev={goToPrev}
                onNext={goToNext}
                onDelete={deleteCurrentNote}
                onChange={updateNote}
                onAddNewNote={addNote}
              />
            ) : (
              <Text>No notes</Text>
            )}
          </Box>

          <Box flex={1} bg="green.4" style={{ borderRadius: 8 }}>
            RECENT FILES
          </Box>
        </Flex>

        <Flex w="48%" direction="column" gap="sm">
          <Box flex={2} bg="blue.4" style={{ borderRadius: 8 }}>
            LESSONS
          </Box>
          <Box flex={1} bg="red.4" style={{ borderRadius: 8 }}>
            OTHER TASKS
          </Box>
        </Flex>

        <Flex w="25%" direction="column" gap="sm">
          <Box flex={1.5} bg="blue.4" style={{ borderRadius: 8 }}>
            FILES
          </Box>
          <Box flex={1} bg="red.4" style={{ borderRadius: 8 }}>
            PLACE FOR AI ASSISTANT
          </Box>
        </Flex>
      </Flex>
    </div>
  );
};

export default MainPage;
