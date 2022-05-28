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
        </div>
    );
}