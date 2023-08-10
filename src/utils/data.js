import { LoremIpsum } from "lorem-ipsum";

const subscriptionTypes = ["Premium", "Standard", "Basic"];

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 4,
    min: 4,
  },
  wordsPerSentence: {
    max: 4,
    min: 4,
  },
});

export const getBrandsArray = (brands) => {
  return brands.map((brand) => brand.brand);
};

export const getRandomSubscription = () => {
  return subscriptionTypes[
    Math.floor(Math.random() * subscriptionTypes.length)
  ];
};

export const prepareUserDetails = (user) => {
  return {
    name: `${user.name.first} ${user.name.last}`,
    age: user.dob.age,
    gender: user.gender,
    "Date of Birth": formateDate(user.dob.date),
    email: user.email,
    phone: user.phone,
    subscription: getRandomSubscription(),
    location: `${user.location.street.number} ${user.location.street.name}, ${user.location.city}, ${user.location.state}, ${user.location.country}`,
    picture: user.picture.large,
    brands: getBrandsArray(user.brands),
    username: user.login.username,
    paragraph: lorem.generateParagraphs(1),
  };
};

const detailsAttributes = [
  "username",
  "email",
  "phone",
  "location",
  "Date of Birth",
  "subscription",
];

const sortOrder = {
  username: 1,
  dateOfBirth: 2,
  phone: 3,
  email: 4,
  subscription: 5,
  location: 6,
};

export const getDetailAttributes = (user) => {
  const userObj = Object.entries(user);

  const filteredUserObj = userObj.filter((item) => {
    return (
      detailsAttributes.includes(item[0]) &&
      item[1] !== undefined &&
      item[1] !== null
    );
  });

  filteredUserObj.sort((a, b) => {
    return sortOrder[a[0]] - sortOrder[b[0]];
  });

  return filteredUserObj;
};

export const formateDate = (date) => {
  const dateArr = date.split("T")[0].split("-");
  return `${dateArr[2]}/${dateArr[1]}/${dateArr[0]}`;
};

export function getRandomIndex(max) {
  return Math.floor(Math.random() * max);
}
