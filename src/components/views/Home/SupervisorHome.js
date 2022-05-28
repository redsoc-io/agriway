import react from "react";
import { useEffect, useState } from "react";


export default function SupervisorHome() {
    const [points, setPoints] = useState(0);
    useEffect(() => {
        fetch("/api/sup_points").then(res => {
            res.json().then(data => {
                setPoints(data);
            });
        })
    }, [])
    return (
        <div>
            <div>
                <h1 className="text-center text-3xl py-3">Supervisor Home</h1>
            </div>
            <div className="flex items-center justify-start py-4">
                <div className="rounded-md shadow px-3 py-4 border">
                    Redeemable Points: {points}
                </div>
            </div>
            <div>
                <div className="rounded-md shadow px-3 py-4 border w-full py-4">
                    <h2>TODOs</h2>
                    <table className="w-full my-5">
                        <thead>
                            <tr>
                                <th>Task</th>
                                <th>Field</th>
                                <th>Before</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>plant potatoes</td>
                                <td>kumaragiri farm</td>
                                <td>13-06-2022</td>
                            </tr>
                            <tr>
                                <td>plant carrot</td>
                                <td>kaveri</td>
                                <td>11-06-2022</td>
                            </tr>
                            <tr>
                                <td>plant cabbage</td>
                                <td>mysore</td>
                                <td>15-06-2022</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}