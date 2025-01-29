import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Typography, List, ListItem, ListItemText } from '@mui/material';

export default function Courses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const querySnapshot = await getDocs(collection(db, 'courses'));
      const coursesData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setCourses(coursesData);
    };
    fetchCourses();
  }, []);

  return (
    <div>
      <Typography variant="h4">Courses</Typography>
      <List>
        {courses.map(course => (
          <ListItem key={course.id}>
            <ListItemText primary={course.title} secondary={course.description} />
          </ListItem>
        ))}
      </List>
    </div>
  );
}