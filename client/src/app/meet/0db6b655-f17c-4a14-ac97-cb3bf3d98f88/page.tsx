"use client";
import Webcam from "react-webcam";
import { useRef, useState } from "react";
import { useEffect } from "react";
import imagee from "./sih-logo-image-2.png";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useSession } from "next-auth/react";
import { SearchIcon } from "@/components/icons/icons";
import { Input } from "@nextui-org/react";
import Chart from "chart.js/auto";

export default function Meet() {

  const [dataForChart, setDataForChart] = useState([])
  const [time, setTime] = dataForChart.map((data) => data.time);
  const [emotions, setEmotions] = dataForChart.map((data) => data.emotion);

  const TimeSlotList: React.FC = () => {
    // Define the start and end times
    const startTime = new Date();
    startTime.setHours(10, 0, 0); // 10:00 AM

    const endTime = new Date();
    endTime.setHours(11, 0, 0); // 11:00 AM

    // Initialize an array to store the time slots
    const timeSlots: string[] = [];

    // Create time slots at a 5-minute interval
    const intervalMinutes = 5;
    let currentTime = new Date(startTime);

    while (currentTime < endTime) {
      // Format the current time as HH:MM
      const formattedTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      // Add the formatted time to the time slots array
      timeSlots.push(formattedTime);

      // Increment the current time by the interval
      currentTime.setMinutes(currentTime.getMinutes() + intervalMinutes);
    }

    return timeSlots
  };

  const LineChart = () => {
    useEffect(() => {
      const ctx = document.getElementById(
        "mylinechart2"
      ) as HTMLCanvasElement | null;

      if (!ctx) {
        console.error("Canvas element 'mylinechart2' not found.");
        return;
      }


      /*       const time = TimeSlotList(); */

      //can u update this config and make it so that i have emotions on y axis and time onx axis?
      let config = {
        type: "line",
        data: {
          labels: time,
          datasets: [
            {
              label: `Average Emotion of the slot`,
              data: emotions,
              borderWidth: 1,
              fill: false,
              borderColor: "rgb(75, 192, 192)",
              color: "#FFFFFF",
              tension: 0.1,
            },
            {
              label: `Average Emotion of the slot 2 `,
              data: [0, 10, 5, 2, 20, 30, 45],
              borderWidth: 1,
              fill: false,
              borderColor: "rgb(75, 92, 192)",
              color: "#FFF00F",
              tension: 0.1,
            },
          ],
        },
        options: {
          maintainAspectRatio: false,
          animations: {
            tension: {
              duration: 1000,
              easing: "linear",
              from: 1,
              to: 0,
            },
          },
          scales: {
            y: {
              min: 0,
              max: 100,
            },
          },
        },
      };

      new Chart(ctx, config);
    }, []);

    return (
      <div className="relative h-96 w-96 ">
        <canvas id="mylinechart2"></canvas>
      </div>
    );
  };


  const webRef = useRef(null);
  const [latestMood, setLatestMood] = useState();
  const { data, status } = useSession();

  const getEmoji = (mood: string) => {
    if (mood === "happy") {
      return "😃";
    } else if (mood === "angry") {
      return "😠";
    } else if (mood === "confusion") {
      return "😕";
    } else if (mood === "sad") {
      return "😔";
    } else {
      return "😐";
    }
  };

  // useEffect(() => {
  //   const myFunction = async () => {
  //     const formData = new FormData();
  //     const img = webRef.current?.getScreenshot();
  //     const blob = await (await fetch(img)).blob();
  //     // Create a File object from the blob
  //     const file = new File([blob], "image.jpg", { type: "image/jpeg" });
  //     formData.append("image", file);
  //     formData.append("uuid", "jigarssiddhpura@gmail.com");

  //     try {
  //       const response = await fetch(
  //         "https://42f1-139-5-239-162.ngrok-free.app/facial-expression-api/",
  //         {
  //           body: formData,
  //           method: "POST",
  //         }
  //       );

  //       if (!response.ok) {
  //         throw new Error(`HTTP error! Status: ${response.status}`);
  //       }

  //       const data = await response.json();
  //       console.log(data);
  //       console.log(data[0].dominant_emotion);
  //       setLatestMood(data[0].dominant_emotion);
  //       if (data.length > 1) {
  //         console.log("multiple people detected");
  //       }
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };
  //   myFunction();
  //   const intervalId = setInterval(myFunction, 5000);

  //   return () => {
  //     clearInterval(intervalId);
  //   };
  // }, []);

  const myMeeting = async (element) => {
    const roomID = "0db6b655-f17c-4a14-ac97-cb3bf3d98f88";
    const appID = 1781273450;
    const serverSecret = "61dab93bbdbf23df323c3f15b819a4b3";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomID,
      Date.now().toString(),
      "John Doe"
    );
    const zp = ZegoUIKitPrebuilt.create(kitToken);
    zp.joinRoom({
      container: element,
      sharedLinks: [
        {
          name: "Classroom link",
          url:
            window.location.protocol +
            "//" +
            window.location.host +
            window.location.pathname +
            "?roomID=" +
            roomID,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.VideoConference,
      },
    });
  };

  return (
    <>
      <div>
        <div ref={myMeeting}></div>
      </div>
      <div>
        {/* <LineChart time = {time} emotion = {emotions}/> */}
      </div>
    </>
  );
}
