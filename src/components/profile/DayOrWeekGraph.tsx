
import Chart, { BarElement } from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import { Card } from "../ui/card";

Chart.register(BarElement);
export default function DayOfWeekGraph({ dayOfWeekData, label = "when are shows?" }: {
    dayOfWeekData: number[];
    label?: string;
}) {
  if (dayOfWeekData.length !== 7) {
    return null;
  }

  if (dayOfWeekData.every((x) => x === 0)) {
    return null;
  }

  const data = {
    labels: [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    datasets: [{
      label,
      data: dayOfWeekData,
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(255, 159, 64, 0.2)",
        "rgba(255, 205, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(201, 203, 207, 0.2)",
      ],
      borderColor: [
        "rgb(255, 99, 132)",
        "rgb(255, 159, 64)",
        "rgb(255, 205, 86)",
        "rgb(75, 192, 192)",
        "rgb(54, 162, 235)",
        "rgb(153, 102, 255)",
        "rgb(201, 203, 207)",
      ],
      borderWidth: 1,
    }],
  };

  return (
    <Card
      className="p-6"
    >
      <Bar data={data} options={{}} height={200} width={400} />
    </Card>
  );
}
