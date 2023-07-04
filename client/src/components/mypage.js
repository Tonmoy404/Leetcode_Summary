import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

function MyPage() {
	const [username, setUsername] = useState("");
	const [output1, setOutput1] = useState("");
	const [output2, setOutput2] = useState("");

	const handleUsernameChange = (event) => {
		setUsername(event.target.value);
	};

	const handleOutput1Click = async () => {
		try{
            const res = axios.post('/fetchStats', username)
            setOutput1(JSON.stringify(res.data))
        }
        catch(err){
            console.log(err)
            setOutput1("An Error Occurred while fetching the data")
        }
	};

	const handleOutput2Click = async () => {
        try {
            const res = await axios.post('/recentStats', { username });
            setOutput2(JSON.stringify(res.data));
        } catch (err) {
            console.log(err);
            setOutput2("Error occurred while fetching data.");
        }
    }       

	return (
		<>
			<div className="text-center mt-5" >
				<h3>Enter Your Leetcode Username to get Summary</h3>
			</div>
			<div className="container mt-5">
				<div className="row justify-content-center">
					<div className="col-md-6">
						<div class="form-group">
							<label for="username">Username:</label>
							<div class="input-group">
								
								<input
									type="text"
									class="form-control mt-2"
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
						<div className="mt-3">{output1}</div>
						<div className="mt-3">{output2}</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default MyPage;
