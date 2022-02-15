import officeData from "../../assets/Vectors/office.json";
import roomData from "../../assets/Vectors/room.json";
import roadData from "../../assets/Vectors/ROAD.json";
import dhabaData from "../../assets/Vectors/dhaba.json";
import cafeData from "../../assets/Vectors/cafe1.json";

const officeOptions = {
  loop: true,
  autoplay: true,
  animationData: officeData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};
const roomOptions = {
  loop: true,
  autoplay: true,
  animationData: roomData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};
const roadOptions = {
  loop: true,
  autoplay: true,
  animationData: roadData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};
const cafeOptions = {
  loop: true,
  autoplay: true,
  animationData: cafeData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};
const dhabaOptions = {
  loop: true,
  autoplay: true,
  animationData: dhabaData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};
export { dhabaOptions, cafeOptions, roadOptions, roomOptions, officeOptions };
