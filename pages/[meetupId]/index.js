import { useRouter } from "next/router";
import MeetupDetail from "../../components/meetups/MeetupDetail";
import { MongoClient, ObjectId } from "mongodb";
import HtmlHead from "../../components/layout/Head";

const MeetupDetails = (props) => {
  useRouter;
  return (
    <>
    <HtmlHead title={props.meetupData.title} />
    <MeetupDetail
      image={props.meetupData.image}
      title={props.meetupData.title}
      address={props.meetupData.address}
      description={props.meetupData.description}
    />
    </>
  );
};


export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://watsum08:marcmeynet08@cluster0.axn5j.mongodb.net/meetups"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    fallback: false,
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId; // params.meetupId because the name of dynamic page is [meetupId]

  const client = await MongoClient.connect(
    "mongodb+srv://watsum08:marcmeynet08@cluster0.axn5j.mongodb.net/meetups"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const selectedMeetup = await meetupsCollection.findOne({ _id: ObjectId(meetupId) });

  client.close();

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description
      },
    },
  };
}

export default MeetupDetails;
