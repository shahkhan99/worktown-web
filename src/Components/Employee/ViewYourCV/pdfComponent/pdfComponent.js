import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#fff",
  },
  mainPage: {
    flexDirection: "column",
    backgroundColor: "#fff",
  },
  section1: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 15,
  },
  section2: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    textDecoration: "underline",
    textDecorationColor: "#31358F",
  },
  section3: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "15px 0px",
    width: "50%",
  },
  section4: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    // alignItems: "center",
    justifyContent: "space-between",
    padding: "15px 0px",
    width: "90%",
  },
  section: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    padding: 15,
  },
  section1Inner: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
  },
  sectionText: {
    fontSize: 40,
    color: "#F15A24",
    fontStyle: "italic",
    fontWeight: "700",
  },
  section1Text: {
    fontSize: 28,
    color: "#31358F",
  },
  section1InnerDeep: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
  },
  section1InnerDeepTxtLBL: {
    fontSize: 16,
    color: "#D24C27",
  },
  section1InnerDeepTxt: {
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 1.5,
  },
});

// Create Document Component
export default function MyPDF({ data }) {
  return (
    <Document style={{ width: "70%" }}>
      <Page size="A4" style={styles.page}>
        <View style={styles.mainPage}>
          <View style={styles.section1}>
            <Text style={styles.sectionText}>{data?.Name}</Text>
          </View>
          <View style={styles.section2}>
            <Text style={styles.section1Text}>Personal Details</Text>
          </View>
          <View style={styles.section}>
            <View style={styles.section3}>
              <Text style={styles.section1InnerDeepTxtLBL}>Email</Text>
              <Text style={styles.section1InnerDeepTxt}>{data?.Email}</Text>
            </View>
            <View style={styles.section3}>
              <Text style={styles.section1InnerDeepTxtLBL}>Phone</Text>
              <Text style={styles.section1InnerDeepTxt}>{data?.Phone}</Text>
            </View>
            <View style={styles.section3}>
              <Text style={styles.section1InnerDeepTxtLBL}>City</Text>
              <Text style={styles.section1InnerDeepTxt}>{data?.City}</Text>
            </View>
          </View>
          <View style={styles.section2}>
            <Text style={styles.section1Text}>Professional Details</Text>
          </View>
          <View style={styles.section}>
            <View style={styles.section3}>
              <Text style={styles.section1InnerDeepTxtLBL}>
                Work Experience
              </Text>
              <Text style={styles.section1InnerDeepTxt}>
                {data?.Experience}
              </Text>
            </View>
            <View style={styles.section3}>
              <Text style={styles.section1InnerDeepTxtLBL}>Education</Text>
              <Text style={styles.section1InnerDeepTxt}>{data?.Education}</Text>
            </View>
            <View style={styles.section3}>
              <Text style={styles.section1InnerDeepTxtLBL}>English Level</Text>
              <Text style={styles.section1InnerDeepTxt}>
                {data?.EnglishLevel}
              </Text>
            </View>
          </View>
          <View style={styles.section2}>
            <Text style={styles.section1Text}>Technical Details</Text>
          </View>
          <View style={styles.section}>
            <View style={styles.section4}>
              <Text style={styles.section1InnerDeepTxtLBL}>Skills</Text>
              <Text style={styles.section1InnerDeepTxt}>{data?.Skills}</Text>
            </View>
            <View style={styles.section4}>
              <Text style={styles.section1InnerDeepTxtLBL}>
                Biggest Achievement
              </Text>
              <Text style={styles.section1InnerDeepTxt}>
                {data?.Achievement}
              </Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}

// import React from "react";
// import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

// // Create styles
// const styles = StyleSheet.create({
//   page: {
//     flexDirection: "column",
//     backgroundColor: "red",
//   },
//   mainPage: {
//     flexDirection: "column",
//     backgroundColor: "red",
//   },
//   section1: {
//     flexGrow: 1,
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     padding: 15,
//   },
//   section2: {
//     flexGrow: 1,
//     display: "flex",
//     flexDirection: "column",
//     width: "40%",
//     padding: 15,
//   },
//   section: {
//     flexGrow: 1,
//     display: "flex",
//     flexDirection: "column",
//     padding: 15,
//   },
//   section1Inner: {
//     flexGrow: 1,
//     display: "flex",
//     flexDirection: "column",
//   },
//   sectionText: {
//     fontSize: 30,
//   },
//   section1Text: {
//     fontSize: 22,
//   },
//   section1InnerDeep: {
//     width: "100%",
//     display: "flex",
//     justifyContent: "space-between",
//   },
//   section1InnerDeepTxt: {
//     fontSize: 13,
//   },
// });

// Create Document Component
// export default function MyPDF() {
//   return (
//     <Document>
//       <Page size="A4" style={styles.page}>
//         <View style={styles.mainPage}>
//           <View style={styles.section1}>
//             <Text style={styles.sectionText}>ARHAM ABEER AHMED</Text>
//           </View>
//           <View style={styles.section2}>
//             <Text style={styles.section1Text}>Personal Details</Text>
//             <View style={styles.section1Inner}>
//               <View style={styles.section1InnerDeep}>
//                 <Text style={styles.section1InnerDeepTxt}>Email</Text>{" "}
//                 <Text style={styles.section1InnerDeepTxt}>sadasdasdasdas</Text>
//               </View>
//               <View style={styles.section1InnerDeep}>
//                 <Text style={styles.section1InnerDeepTxt}>Phone</Text>{" "}
//                 <Text style={styles.section1InnerDeepTxt}>03030303033030</Text>
//               </View>
//               <View style={styles.section1InnerDeep}>
//                 <Text style={styles.section1InnerDeepTxt}>City</Text>{" "}
//                 <Text style={styles.section1InnerDeepTxt}>karachi</Text>
//               </View>
//             </View>
//           </View>
//           <View style={styles.section}>
//             <Text style={styles.section1Text}>Professional Details</Text>
//             <View style={styles.section1Inner}>
//               <View style={styles.section1InnerDeep}>
//                 <Text style={styles.section1InnerDeepTxt}>Experience</Text>{" "}
//                 <Text style={styles.section1InnerDeepTxt}>10+ years</Text>
//               </View>
//               <View style={styles.section1InnerDeep}>
//                 <Text style={styles.section1InnerDeepTxt}>Education</Text>{" "}
//                 <Text style={styles.section1InnerDeepTxt}>Graduate</Text>
//               </View>
//               <View style={styles.section1InnerDeep}>
//                 <Text style={styles.section1InnerDeepTxt}>English Level</Text>{" "}
//                 <Text style={styles.section1InnerDeepTxt}>
//                   English-Urdu mix
//                 </Text>
//               </View>
//             </View>
//           </View>
//           <View style={styles.section}>
//             <Text style={styles.section1Text}>Technical Details</Text>
//             <View style={styles.section1Inner}>
//               <View style={styles.section1InnerDeep}>
//                 <Text style={styles.section1InnerDeepTxt}>Skilss</Text>{" "}
//                 <Text style={styles.section1InnerDeepTxt}>
//                   React, JavaScript, Python, C#, .Net asd sadas dasas asd as das
//                   dasd asdasdas
//                 </Text>
//               </View>
//               <View style={styles.section1InnerDeep}>
//                 <Text style={styles.section1InnerDeepTxt}>
//                   Biggest Achievement
//                 </Text>{" "}
//                 <Text style={styles.section1InnerDeepTxt}>
//                   Lorem Ipsum is simply dummy text of the printing and
//                   typesetting industry. Lorem Ipsum has been the industry's
//                   standard dummy text ever since the 1500s, when an unknown
//                   printer took a galley of type and scrambled it to make a type
//                   specimen book. It has survived not only five centuries, but
//                   also the leap into electronic typesetting, remaining
//                   essentially unchanged. It was popularised in the 1960s with
//                   the release of Letraset sheets containing Lorem Ipsum
//                   passages, and more recently with desktop publishing software
//                   like Aldus PageMaker including versions of Lorem Ipsum.
//                 </Text>
//               </View>
//             </View>
//           </View>
//         </View>
//       </Page>
//     </Document>
//   );
// }
