import { useState } from "react";
import { Flex, Box } from "@mantine/core";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const MainPage = () => {
  const [value, onChange] = useState(new Date());

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
          <Box flex={1} bg="red.4" style={{ borderRadius: 8 }}>
            NOTES
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
