export const getComments = async () => {
  return [
    {
      id: "1",
      body: "Comment 1",
      username: "Sheela",
      userId: "1",
      parentId: null,
      createdAt: "2021-12-09T23:00:33.010+02:00",
    },
    {
      id: "2",
      body: "Comment 2",
      username: "Ram",
      userId: "2",
      parentId: null,
      createdAt: "2021-12-09T23:00:33.010+02:00",
    },
    {
      id: "3",
      body: "First comment first child",
      username: "Ram",
      userId: "2",
      parentId: "1",
      createdAt: "2021-12-09T23:00:33.010+02:00",
    },
    {
      id: "4",
      body: "Second comment second child",
      username: "Ram",
      userId: "2",
      parentId: "2",
      createdAt: "2021-12-09T23:00:33.010+02:00",
    },
  ];
};

export const addComment = async (text, parentId = null) => {
  return {
    id: Math.random().toString(36).substr(2, 9),
    body: text,
    parentId,
    userId: "1",
    username: "John",
    createdAt: new Date().toISOString(),
  };
};

export const editComment = async (text) => {
  return { text };
};

export const deleteComment = async () => {
  return {};
};
