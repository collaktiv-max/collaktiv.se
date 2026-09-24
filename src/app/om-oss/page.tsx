import type { Metadata } from "next";
import { SimplePage } from "@/components/home/SimplePage";
import { PILOT_REGION } from "@/lib/config";

export const metadata: Metadata = { title: "Om oss – Collaktiv" };

export default function OmOssPage() {
  return (
    <SimplePage title="Om oss">
      <p>
        Collaktiv belönar dig som åker kollektivt med rabatter hos lokala
        företag. Fler hållbara resor för resenärerna – och fler nya
        stamkunder för företagen.
      </p>
      <p>
        Vi startar i {PILOT_REGION} och växer region för region. Mer om oss
        kommer snart här.
      </p>
    </SimplePage>
  );
}
