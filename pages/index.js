import MeetupList from "../components/meetups/MeetupList";

import Head from "next/head";
import { MongoClient } from "mongodb";
import HtmlHead from "../components/layout/Head";

// const DUMMY_MEETUPS = [
//   {
//     id: "m1",
//     title: "The First Meetup",
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/2/27/Le_Bouveret_-_Port_Valais.jpg",
//     address: "bouveret",
//     description: "very nice meetup in town",
//   },
//   {
//     id: "m2",
//     title: "The Second Meetup",
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Vouvry_from_Corbeyrier.jpg/1200px-Vouvry_from_Corbeyrier.jpg",
//     address: "vouvry",
//     description: "very nice meetup just beside",
//   },
// ];

const HomePage = (props) => {
  return (
    <>
      <HtmlHead title="this is the home page" />
      <MeetupList meetups={props.meetups} />
    </>
  );
};

// export async function getServerSideProps(context) {
//     const req = context.req;
//     const res = context.res;
//
//     return {
//         props: {
//             meetups: DUMMY_MEETUPS
//         }
//     };
// }; // this code will run for every request to server

export async function getStaticProps() {
  // does this on server before rendering component
  const client = await MongoClient.connect(
    "mongodb+srv://watsum08:marcmeynet08@cluster0.axn5j.mongodb.net/meetups"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1, // regenerates this page on the server every 1 second, data(meetups) will be updated every second
  };
} // code here will not show nor execute on client side, this happens on build process on server

export default HomePage;
