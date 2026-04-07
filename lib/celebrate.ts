import confetti from "canvas-confetti";

export function celebrateSuccess() {
    confetti({
        particleCount: 70,
        spread: 75,
        startVelocity: 28,
        origin: { y: 0.7 },
        scalar: 0.9,
    })
}