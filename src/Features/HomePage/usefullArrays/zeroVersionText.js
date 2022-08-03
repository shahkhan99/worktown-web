import RoomGif from "./../../../assets/Vectors/room.gif";
import office from "./../../../assets/Vectors/office.gif";
import cafegif from "./../../../assets/Vectors/cafe.gif";
import dhaba from "./../../../assets/Vectors/dhaba.gif";
import roadgif from "./../../../assets/Vectors/road.gif";
import {
  dhabaOptions,
  cafeOptions,
  roadOptions,
  roomOptions,
  officeOptions,
} from "./../animationOptions";

const animatedStrings = [
  " client ",
  " job ",
  " cofounder ",
  " employee ",
  " employer ",
  " investor ",
  " colleague ",
];
const content = [
  {
    id: 1,
    tittle: "Land your first",
    body: "We can’t promise that you will immediately, but if you stick around, you’ll see and meet remarkable people who aren’t any different from you.",
    vector: office,
    // colorCode: "#3D459D",
    colorCode: "#fff",
    lottieAnimation: officeOptions,
  },
  {
    id: 2,
    tittle: "Community-first ",
    unstyled: " from the ground up",
    body: "We’re creating a super community of storytellers, founders, dreamers, forward-thinkers, misfits, rebels, entrepreneurs, graduates, employees, investors, polyworkers, problem solvers, yay-sayers, coders, designers, freelancers, stargazers and storm-chasers.",
    vector: cafegif,
    // colorCode: "#F0BD3A",
    colorCode: "#fff",
    lottieAnimation: cafeOptions,
  },
  {
    id: 3,
    tittle: "A not-so-professional network",
    body: "Professional networks are decades old and feel out-of-place. Worktown wants to make it exciting and relevant. And we think everyone’s smart enough to know what works for them.",
    vector: roadgif,
    colorCode: "#fff",
    lottieAnimation: roadOptions,
  },
  {
    id: 4,
    tittle: "Where you’re not defined by your job title",
    body: "That is a super-narrow expression of who you are. With Worktown, let the world know how much more you bring to the table than the arbitrary job titles and descriptions that don't fit your work.",
    vector: dhaba,
    // colorCode: "#F15925",
    colorCode: "#fff",
    lottieAnimation: dhabaOptions,
  },
  {
    id: 5,
    // tittle: "Why limit the way people see you?",
    // body: "Resumes are two-dimensional – they don’t talk much about who you are and how you’ve had to work your socks off to get to where you are. Worktown helps you show them what makes you ‘you’.",
    vector: RoomGif,
    colorCode: "#fff",
    lottieAnimation: roomOptions,
  },
  {
    id: 6,
    // tittle: "Why limit the way people see you?",
    // body: "Resumes are two-dimensional – they don’t talk much about who you are and how you’ve had to work your socks off to get to where you are. Worktown helps you show them what makes you ‘you’.",
    vector: RoomGif,
    colorCode: "#fff",
    lottieAnimation: roomOptions,
  },
];

export { animatedStrings, content };
