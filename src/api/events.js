import instance from './instance.js';

export const getData = async () => {
  const {data} = await instance.get('events');
  return data;
};

export const addData = async (event) => {
  const {data} = await instance.post('events', event);
  return data;
};

export const editData = async (event) => {
  const {data} = await instance.patch(`events/${event.id}`, event);
  return data;
};

export const deleteData = async (id) => {
  const {status} = await instance.delete(`events/${id}`);
  if (status === 200) {
    return id;
  }
};
