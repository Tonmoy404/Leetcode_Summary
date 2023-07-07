import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { toast } from "react-toastify";

function MyPage() {
	const [username, setUsername] = useState("");
	const [output1, setOutput1] = useState("");
	const [output2, setOutput2] = useState("");
	const [All, setAll] = useState("")
	const [Easy, setEasy] = useState("")
	const [Medium, setMedium] = useState("")
	const [Hard, setHard] = useState("")

	const handleUsernameChange = (event) => {
		setUsername(event.target.value);
	};

	const handleOutput1Click = async () => {
		try {
			toast.success("hello");
			const res = await axios.post("http://localhost:3001/summary", {
				username,
			});
			console.log("first-->", res.data.okay);
			const data = res.data.okay;
			let output = "";
			data.forEach((item) => {
				output += `${item.difficulty}: ${item.count}\n`;
			});
			const { All, Easy, Medium, Hard } = output;
			setAll(All)
			setEasy(Easy)
			setMedium(Medium)
			setHard(Hard)
			setOutput1(output);
			console.log(output);
		} catch (err) {
			console.log(err);
			setOutput1("An Error Occurred while fetching the data");
			toast.warning("An Error Occured");
		}
	};

	const handleOutput2Click = async () => {
		try {
			const res = await axios.post("http://localhost:3001/stats", { username });
			const data = res.data;
			console.log("----> output2", data);
			let output = "";
			data.forEach((item) => {
				output += `${item.date}: ${item.cnt}\n`;
				item.data.forEach((problem) => {
					output += `   - ${problem.title}\n`;
				});
				output += "\n";
			});
			setOutput2(output);
		} catch (err) {
			console.log(err);
			setOutput2("Error occurred while fetching data.");
			toast.warning("An Error Occured");
		}
	};

	return (
		<>
			<div className="text-center mt-5">
				<h3>Enter Your Leetcode Username to get Summary</h3>
			</div>
			<div className="container mt-5">
				<div className="row justify-content-center">
					<div className="col-md-6">
						<div className="form-group">
							<label htmlFor="username">Username:</label>
							<div className="input-group">
								<input
									type="text"
									className="form-control mt-2"
									id="username"
									value={username}
									onChange={handleUsernameChange}
								/>
							</div>
						</div>

						<button
							className="btn btn-outline-dark mx-5 mt-2 "
							onClick={handleOutput1Click}
						>
							All Summary
						</button>
						<button
							className="btn btn-outline-dark mt-2"
							style={{ marginLeft: "185px" }}
							onClick={handleOutput2Click}
						>
							Last 7 days
						</button>
						<br />
						<div className=" text-center mt-3">{output1}</div>
						{/* <table>
							<tbody>
								<tr>
									<td>All:</td>
									<td>{All}</td>
								</tr>
								<tr>
									<td>Easy:</td>
									<td>{Easy}</td>
								</tr>
								<tr>
									<td>Medium:</td>
									<td>{Medium}</td>
								</tr>
								<tr>
									<td>Hard:</td>
									<td>{Hard}</td>
								</tr>
							</tbody>
						</table> */}

						<div className="mt-3">{output2}</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default MyPage;
