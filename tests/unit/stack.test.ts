import { describe, expect, it } from "vitest";
import { Slot } from "@radix-ui/react-slot";
import { moduleRegistry } from "@/modules/registry";

describe("stack", () => {
  it("exposes Radix Slot for the ui layer", () => {
    expect(Slot).toBeTypeOf("object");
  });

  it("does not register agenda in the production module list", () => {
    expect(moduleRegistry.map((module) => module.id)).toEqual(["cms"]);
  });
});
