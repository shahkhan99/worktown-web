import officeData from "../../assets/Vectors/jsons/office.json";
import roomData from "../../assets/Vectors/jsons/room.json";
import roadData from "../../assets/Vectors/jsons/ROAD.json";
import dhabaData from "../../assets/Vectors/jsons/dhaba.json";
import cafeData from "../../assets/Vectors/jsons/cafe1.json";

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
