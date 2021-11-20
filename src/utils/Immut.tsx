interface Country {
  name: string;
  flag?: string | null;
}

const updateObjectInArray = (current: Country[], item: Country) => {
  return current.map(({ name, flag }) => {
    if (name !== item.name) {
      return { name, flag };
    }

    return {
      ...{ name, flag },
      ...item
    };
  });
};

export default updateObjectInArray;
