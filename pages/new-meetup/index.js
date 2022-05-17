import { useRouter } from "next/router";
import HtmlHead from "../../components/layout/Head";
import NewMeetUpForm from "../../components/meetups/NewMeetupForm";

const NewMeetupPage = () => {
  const router = useRouter();

  const addMeetupHandler = async (enteredMeetupData) => {
    const response = await fetch("../api/new-meetup", {
      method: "POST",
      body: JSON.stringify(enteredMeetupData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    console.log(data);

    router.push("/");
  };
  return (
    <>
      <HtmlHead title="this is the add meetup page" />
      <NewMeetUpForm onAddMeetup={addMeetupHandler} />;
    </>
  );
};

export default NewMeetupPage;
