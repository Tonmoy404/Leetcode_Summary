import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { toast } from "react-toastify";
// import { ToastContainer } from "react-toastify";

function MyPage() {
	const [username, setUsername] = useState("");
	const [output1, setOutput1] = useState(null);
	const [output2, setOutput2] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const handleUsernameChange = (event) => {
		setUsername(event.target.value);
	};

	const handleOutput1Click = async () => {
		try {
			setIsLoading(true);

			const res = await axios.post("http://localhost:3001/summary", {
				username,
			});
			console.log("responose-> ", res.data.okay);

			setOutput1(res.data.okay);
		} catch (err) {
			console.log("--->", err);
			setOutput1("An Error Occurred while fetching the data");
		} finally {
			setIsLoading(false);
		}
	};

	const handleOutput2Click = async () => {
		try {
			const res = await axios.post("http://localhost:3001/stats", { username });
			const data = res.data;
			console.log("----> output2", data);

			setOutput2(data);
		} catch (err) {
			console.log(err);
			setOutput2(null);
			toast.warning("User not found");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<>
			<div className="text-center mt-5">
				<h3 style={{ color: "#ffffff" }}>
					Enter Your Leetcode Username to get Summary
				</h3>
			</div>
			<div className="container mt-5">
				<div className="row justify-content-center">
					<div className="col-md-6">
						<div className="form-group">
							<label htmlFor="username" style={{ color: "#ffffff" }}>
								Username:
							</label>
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
							style={{ color: "#ffffff" }}
						>
							All Summary
						</button>
						<button
							className="btn btn-outline-dark mt-2"
							style={{ marginLeft: "185px", color: "#ffffff" }}
							onClick={handleOutput2Click}
						>
							Last 7 days
						</button>
						<br />

						{/* <div className=" text-center mt-3">{output1}</div> */}
						<div class="container mt-5">
							<div class="row justify-content-center">
								<div class="col-md-8">
									<table class="table table-bordered table-dark center">
										<tbody class="text-center">
											{output1 &&
												output1.map((item) => {
													return (
														<tr>
															<td colspan="100">{item.difficulty}</td>
															<td colspan="4">{item.count}</td>
														</tr>
													);
												})}
										</tbody>
									</table>
								</div>
							</div>
						</div>

						<div className="mt-3">
							{output2 && (
								<table className="table table-bordered table-dark center">
									<thead className="text-center">
										<tr>
											<th>Date</th>
											<th>Problem Titles</th>
											<th>Solve Count</th>
										</tr>
									</thead>
									<tbody>
										{output2.map((recentItem, index) => {
											const dateTime = recentItem?.date;
											const problemCount = recentItem.cnt;
											return (
												<tr key={`index-${index}`} className="table-item text-center">
													<td>{dateTime}</td>
													<td>
														{recentItem.data.map((singleItem) => (
															<div key={singleItem.id}>
																<p>{singleItem.title}</p>
															</div>
														))}
													</td>
													<td>{problemCount}</td>
												</tr>
											);
										})}
									</tbody>
								</table>
							)}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default MyPage;
