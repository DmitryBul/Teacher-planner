import { useState } from "react";
import { 
  Flex, Box, Text, Title, List, ThemeIcon, 
  Button, Modal, TextInput, Group, Select,
  Tabs, Table, ScrollArea
} from "@mantine/core";
import { TimeInput } from "@mantine/dates";
import { IconBook, IconPlus, IconTrash, IconCalendar } from "@tabler/icons-react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import NoteCard from "../components/NoteCard"; 
import { useNotes } from "../hooks/useNotes"; 
import useLessons from "../hooks/useLessons";
import FileSystem from "../components/FileSystem";

const MainPage = () => {
  const { 
    lessons, 
    selectedDate, 
    isModalOpen, 
    weeklySchedule,
    handleDateChange,
    openModal,
    closeModal,
    handleInputChange,
    saveWeeklySchedule,
    deleteLesson,
    daysOfWeek
  } = useLessons();
  
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

  const [activeTab, setActiveTab] = useState('calendar');
  const [newLesson, setNewLesson] = useState({
    day: '1',
    subject: "",
    startTime: "08:00",
    endTime: "08:45",
    room: ""
  });

  const handleAddLesson = () => {
    if (!newLesson.subject.trim()) return;
    saveWeeklySchedule(newLesson);
    setNewLesson({
      day: '1',
      subject: "",
      startTime: "08:00",
      endTime: "08:45",
      room: ""
    });
    closeModal();
  };

  return (
    <div style={{ 
      marginTop: "20px", 
      padding: "16px", 
      height: "98vh", 
      width: "100vw", 
      boxSizing: "border-box" 
    }}>
      <Modal
        opened={isModalOpen}
        onClose={closeModal}
        title="Добавить расписание на неделю"
        size="lg"
      >
        <Select
          label="День недели"
          data={[
            { value: '1', label: 'Понедельник' },
            { value: '2', label: 'Вторник' },
            { value: '3', label: 'Среда' },
            { value: '4', label: 'Четверг' },
            { value: '5', label: 'Пятница' },
          ]}
          value={newLesson.day}
          onChange={(value) => setNewLesson({...newLesson, day: value})}
          mb="sm"
        />
        
        <TextInput
          label="Название урока"
          placeholder="Математика, Физика и т.д."
          name="subject"
          value={newLesson.subject}
          onChange={(e) => setNewLesson({...newLesson, subject: e.target.value})}
          required
          mb="sm"
        />
        
        <Group grow mb="sm">
          <TimeInput
            label="Время начала"
            value={newLesson.startTime}
            onChange={(e) => setNewLesson({...newLesson, startTime: e.target.value})}
            format="24"
            withSeconds={false}
            required
          />
          <TimeInput
            label="Время окончания"
            value={newLesson.endTime}
            onChange={(e) => setNewLesson({...newLesson, endTime: e.target.value})}
            format="24"
            withSeconds={false}
            required
          />
        </Group>
        
        <TextInput
          label="Кабинет"
          placeholder="Номер кабинета"
          name="room"
          value={newLesson.room}
          onChange={(e) => setNewLesson({...newLesson, room: e.target.value})}
          mb="sm"
        />
        
        
        <Button fullWidth onClick={handleAddLesson}>
          Сохранить урок
        </Button>
      </Modal>

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
                onChange={handleDateChange}
                value={selectedDate}
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
              <Text>Заметок нет</Text>
            )}
          </Box>

          <Box flex={1} bg="gray.1" style={{ borderRadius: 8, padding: "16px" }}>
            <Text size="lg" weight={500}>Недавние файлы</Text>
          </Box>
        </Flex>

        <Flex w="48%" direction="column" gap="sm">
          <Box flex={2} p="md" style={{ 
            borderRadius: 8, 
            backgroundColor: "#f8f9fa",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
          }}>
            <Group position="apart" mb="md">
              <Title order={3} color="blue.8">
                Расписание уроков
              </Title>
              <Button 
                leftIcon={<IconPlus size={16} />} 
                onClick={openModal}
                variant="light"
                color="blue"
              >
                Добавить расписание
              </Button>
            </Group>
            
            <Tabs value={activeTab} onTabChange={setActiveTab}>
              <Tabs.List>
                <Tabs.Tab value="calendar" icon={<IconCalendar size={14} />}>Календарь</Tabs.Tab>
                <Tabs.Tab value="weekly" icon={<IconBook size={14} />}>На неделю</Tabs.Tab>
              </Tabs.List>

              <Tabs.Panel value="calendar" pt="xs">
                <Title order={4} mb="sm">
                  {daysOfWeek[selectedDate.getDay()]}, {selectedDate.toLocaleDateString()}
                </Title>
                
                {lessons.length > 0 ? (
                  <List
                    spacing="md"
                    size="lg"
                    center
                    icon={
                      <ThemeIcon color="blue" size={28} radius="xl">
                        <IconBook size="1rem" />
                      </ThemeIcon>
                    }
                  >
                    {lessons.map((lesson, index) => (
                      <List.Item 
                        key={`${lesson.day}-${index}`}
                        icon={
                          <Button 
                            compact 
                            variant="subtle" 
                            color="red" 
                            onClick={() => deleteLesson(lesson.day, index)}
                            size="sm"
                          >
                            <IconTrash size={16} />
                          </Button>
                        }
                      >
                        <Text weight={700} size="lg">
                          {index + 1}. {lesson.subject}
                        </Text>
                        <Text size="md" color="dimmed">
                          ⏱ {lesson.startTime} - {lesson.endTime} | 🚪 {lesson.room}
                        </Text>
                      </List.Item>
                    ))}
                  </List>
                ) : (
                  <Box 
                    ta="center" 
                    py="xl" 
                    style={{ 
                      border: "1px dashed #ced4da",
                      borderRadius: "8px"
                    }}
                  >
                    <Text size="lg" color="dimmed" mb="md">
                      На этот день уроков не запланировано
                    </Text>
                  </Box>
                )}
              </Tabs.Panel>

              <Tabs.Panel value="weekly" pt="xs">
                <ScrollArea style={{ height: 400 }}>
                  <Table striped highlightOnHover>
                    <thead>
                      <tr>
                        <th>День недели</th>
                        <th>Расписание</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(weeklySchedule).map(([day, dayLessons]) => (
                        <tr key={day}>
                          <td width="150"><b>{daysOfWeek[day]}</b></td>
                          <td>
                            {dayLessons.length > 0 ? (
                              <List spacing="xs">
                                {dayLessons.map((lesson, index) => (
                                  <List.Item key={`${day}-${index}`}>
                                    {index + 1}. {lesson.subject} ({lesson.startTime}-{lesson.endTime}, каб. {lesson.room}, {lesson.teacher})
                                  </List.Item>
                                ))}
                              </List>
                            ) : (
                              <Text color="dimmed">Нет уроков</Text>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </ScrollArea>
              </Tabs.Panel>
            </Tabs>
          </Box>
          
          <Box flex={1} bg="gray.1" style={{ borderRadius: 8, padding: "16px" }}>
            <Text size="lg" weight={500}>Другие задачи</Text>
          </Box>
        </Flex>

        <Flex w="25%" direction="column" gap="sm">
          <Box flex={1.5} bg="gray.1" style={{ borderRadius: 8, padding: "16px" }}>
  <Text size="lg" weight={500} mb="sm">Файлы</Text>
  <FileSystem />
</Box>
          <Box flex={1} bg="gray.1" style={{ borderRadius: 8, padding: "16px" }}>
            <Text size="lg" weight={500}>AI Ассистент</Text>
          </Box>
        </Flex>
      </Flex>
    </div>
  );
};

export default MainPage;