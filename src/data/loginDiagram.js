const xOffset = window.innerWidth * 0.57 * 0.09;
export const diagram = {
  tables: [
    {
      name: "galactic_users",
      x: xOffset + 75,
      y: window.innerHeight * 0.23 - (50 + 4 * 36 + 7) * 0.5,
      fields: [
        {
          name: "id",
          type: "INT",
        },
        {
          name: "username",
          type: "VARCHAR",
        },
        {
          name: "email",
          type: "VARCHAR",
        },
        {
          name: "password",
          type: "VARCHAR",
        },
      ],
      color: "#7d9dff",
    },
    {
      id: 1,
      name: "celestial_data",
      x: xOffset + 27,
      y: window.innerHeight * 0.72 - (50 + 5 * 36 + 7) * 0.5,
      fields: [
        {
          name: "id",
          type: "INT",
        },
        {
          name: "user_id",
          type: "INT",
        },
        {
          name: "type",
          type: "ENUM",
        },
        {
          name: "time",
          type: "TIMESTAMP",
        },
        {
          name: "content",
          type: "VARCHAR",
        },
      ],
      color: "#89e667",
    },
    {
      id: 2,
      name: "astro_mine",
      x: xOffset + 336,
      y: window.innerHeight * 0.72 - (50 + 3 * 36 + 7) * 0.5,
      fields: [
        {
          name: "id",
          type: "INT",
        },
        {
          name: "asteroid_id",
          type: "INT",
        },
        {
          name: "data_id",
          type: "INT",
        },
      ],
      color: "#6360f7",
    },
    {
      id: 3,
      name: "asteroid",
      x: xOffset + 310,
      y: window.innerHeight * 0.23 - (50 + 3 * 36 + 7) * 0.5,
      fields: [
        {
          name: "id",
          type: "INT",
        },
        {
          name: "name",
          type: "VARCHAR",
        },
        {
          name: "location",
          type: "VARCHAR",
        },
      ],
      color: "#3cde7d",
    },
  ],
  relationships: [
    {
      startTableId: 1,
      startFieldId: 1,
      endTableId: 0,
      endFieldId: 0,
      startX: xOffset + 42,
      startY: window.innerHeight * 0.72 - (4 * 36 + 50 + 7) * 0.5 + (50 + 18 * 2),
      endX: xOffset + 90,
      endY: window.innerHeight * 0.23 - (4 * 36 + 50 + 7) * 0.5 + (50 + 18 * 1),
      cardinality: "Many to one",
    },
    {
      startTableId: 2,
      startFieldId: 2,
      endTableId: 1,
      endFieldId: 0,
      startX: xOffset + 351,
      startY: window.innerHeight * 0.72 - (3 * 36 + 50 + 7) * 0.5 + (50 + 18 * 5),
      endX: xOffset + 42,
      endY: window.innerHeight * 0.72 - (5 * 36 + 50 + 7) * 0.5 + (50 + 18 * 1),
      cardinality: "One to one",
    },
    {
      startTableId: 2,
      startFieldId: 1,
      endTableId: 3,
      endFieldId: 0,
      startX: xOffset + 351,
      startY: window.innerHeight * 0.72 - (3 * 36 + 50 + 7) * 0.5 + (50 + 18 * 3),
      endX: xOffset + 325,
      endY: window.innerHeight * 0.23 - (3 * 36 + 50 + 7) * 0.5 + (50 + 18 * 1),
      cardinality: "Many to one",
    },
  ],
};