import { toPng } from "html-to-image";

export async function downloadNodeAsPng(node: HTMLElement, fileName: string) {
    const dataUrl = await toPng(node, {
        cacheBust: true,
        pixelRatio: 2,
    });

    const link = document.createElement("a");
    link.download = fileName;
    link.href = dataUrl;
    link.click();
}