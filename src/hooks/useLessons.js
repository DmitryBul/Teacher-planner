import { useState, useEffect } from "react";

const useLessons = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [lessons, setLessons] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [weeklySchedule, setWeeklySchedule] = useState({
    '1': [], 
    '2': [], 
    '3': [],
    '4': [], 
    '5': [], 
  });

  const daysOfWeek = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];

  useEffect(() => {
    const savedSchedule = localStorage.getItem('weeklyLessonSchedule');
    if (savedSchedule) {
      setWeeklySchedule(JSON.parse(savedSchedule));
    }
  }, []);

  useEffect(() => {
    const dayOfWeek = selectedDate.getDay().toString();
    setLessons(weeklySchedule[dayOfWeek] || []);
  }, [selectedDate, weeklySchedule]);

  const saveSchedule = (schedule) => {
    localStorage.setItem('weeklyLessonSchedule', JSON.stringify(schedule));
  };

  const saveWeeklySchedule = (lesson) => {
    const updatedSchedule = {
      ...weeklySchedule,
      [lesson.day]: [...weeklySchedule[lesson.day], lesson]
    };
    setWeeklySchedule(updatedSchedule);
    saveSchedule(updatedSchedule);
  };

  const deleteLesson = (day, index) => {
    const updatedDayLessons = [...weeklySchedule[day]];
    updatedDayLessons.splice(index, 1);
    
    const updatedSchedule = {
      ...weeklySchedule,
      [day]: updatedDayLessons
    };
    
    setWeeklySchedule(updatedSchedule);
    saveSchedule(updatedSchedule);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return {
    lessons,
    selectedDate,
    isModalOpen,
    weeklySchedule,
    daysOfWeek,
    handleDateChange,
    openModal: () => setIsModalOpen(true),
    closeModal: () => setIsModalOpen(false),
    saveWeeklySchedule,
    deleteLesson
  };
};

export default useLessons;