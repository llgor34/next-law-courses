import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-nextjs-toast';
import { useCollection } from '../../firebase-client/useCollection';
import { useDoc } from '../../firebase-client/useDoc';
import Select from 'react-select';

const throwError = (error) => {
  toast.notify(error, {
    duration: 3,
    type: 'error',
    title: 'Wystąpił błąd!',
  });
};

function removeItemOnce(arr, value) {
  var index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
}

const permissions = [
  { label: 'Przyznaj uprawnienia', value: true },
  { label: 'Odbierz uprawnienia', value: false },
];

const ManageUsers = () => {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [permission, setPermission] = useState(null);
  const [error, setError] = useState(null);
  const {
    updateDoc,
    error: docError,
    isPending: docIsPending,
  } = useDoc('users');
  const {
    isPending: usersIsPending,
    error: usersError,
    documents: users,
  } = useCollection('users');

  const {
    isPending: coursesIsPending,
    error: coursesError,
    documents: courses,
  } = useCollection('courses');

  //   handle errors
  useEffect(() => {
    if (error) {
      throwError(error);
      return;
    }

    if (usersError) {
      throwError(usersError);
      return;
    }

    if (coursesError) {
      throwError(coursesError);
      return;
    }

    if (docError) {
      throwError(docError);
    }
  }, [error, usersError, coursesError, docError]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (error) return;

    // Tutaj dodałem ten code

    for (let user of selectedUsers) {
      const updatedCourses = [...user.value.ownedCourses];

      // add permission to courses, else remove it
      if (permission.value) {
        updatedCourses.push(...selectedCourses.map((course) => course.value));
        updateDoc(user.value.id, {
          ownedCourses: [...new Set(updatedCourses)],
        });
      } else {
        const selectedCoursesValues = selectedCourses.map(
          (course) => course.value
        );
        const arrayToUpdate = updatedCourses.filter(
          (course) => !selectedCoursesValues.includes(course + '')
        );

        updateDoc(user.value.id, {
          ownedCourses: arrayToUpdate,
        });
      }
    }

    // Koniec
    
    setSelectedCourses([]);
    setSelectedUsers([]);
    setPermission(null);

    toast.notify('Aktualizacja nastąpi w ciągu kilku następnych minut', {
      duration: 3,
      type: 'success',
      title: 'Zmieniono uprawnienia!',
    });
  };

  const validateForm = () => {
    //   validation
    if (selectedUsers.length < 1) {
      setError('Należy wybrać przynajmniej jednego użytkownika!');
      return;
    }

    if (selectedCourses.length < 1) {
      setError('Należy wybrać przynajmniej jeden kurs!');
      return;
    }

    if (permission.value === null || permission.value === undefined) {
      setError('Należy wybrać akcję, która ma zostać podjęta!');
      return;
    }
  };

  return (
    <div className="p-add-post">
      <a className="index-1000">
        <ToastContainer align="center" />
      </a>
      <form onSubmit={handleFormSubmit}>
        <label>
          <span>Wybierz użytkowników</span>
          <br />
          {users && (
            <Select
              isMulti
              options={users.map((user) => ({
                label: user.displayName,
                value: user,
              }))}
              className="disableStupidStyles"
              value={selectedUsers}
              onChange={(newSelectedUsers) =>
                setSelectedUsers(newSelectedUsers)
              }
            />
          )}
        </label>
        <br />

        <label>
          <span>Wybierz kursy</span>
          <br />
          {courses && (
            <Select
              isMulti
              options={courses.map((course) => ({
                label: course.title,
                value: course.id,
              }))}
              className="disableStupidStyles"
              value={selectedCourses}
              onChange={(newSelectedCourses) =>
                setSelectedCourses(newSelectedCourses)
              }
            />
          )}
        </label>
        <br />

        <label>
          <span>Zarządzaj uprawnieniami </span>
          <br />
          <Select
            className="disableStupidStyles"
            options={permissions}
            value={permission}
            onChange={(newPermission) => setPermission(newPermission)}
          />
        </label>
        <br />

        {!usersIsPending && !coursesIsPending && !docIsPending && (
          <button onClick={validateForm}>Potwierdź</button>
        )}
        {(usersIsPending || coursesIsPending || docIsPending) && (
          <button disabled>Loading...</button>
        )}
      </form>
    </div>
  );
};

export default ManageUsers;
