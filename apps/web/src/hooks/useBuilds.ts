import { Build } from "@/types/build";
import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "flysonic-builds";

export function useBuilds() {
    const [builds, setBuilds] = useState<Build[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            try {
                setBuilds(JSON.parse(stored));
            } catch (e) {
                console.error("Failed to parse builds", e);
            }
        }
        setIsLoading(false);
    }, []);

    const saveBuilds = useCallback((newBuilds: Build[]) => {
        setBuilds(newBuilds);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newBuilds));
    }, []);

    const createBuild = useCallback(
        (name: string) => {
            const newBuild: Build = {
                id: crypto.randomUUID(),
                name,
                createdAt: Date.now(),
                updatedAt: Date.now(),
                nodes: [],
                edges: [],
            };
            // Create a new array from current state to ensure valid closure usage
            // But since this depends on `builds` state which might be stale if not careful...
            // It's better to use functional update if possible, but saveBuilds needs the value.
            // Simplest way: read from current state, then save.
            const updated = [...builds, newBuild];
            saveBuilds(updated);
            return newBuild.id;
        },
        [builds, saveBuilds]
    );

    const updateBuild = useCallback(
        (id: string, data: Partial<Build>) => {
            const newBuilds = builds.map((b) =>
                b.id === id ? { ...b, ...data, updatedAt: Date.now() } : b
            );
            saveBuilds(newBuilds);
        },
        [builds, saveBuilds]
    );

    const getBuild = useCallback(
        (id: string) => {
            return builds.find((b) => b.id === id);
        },
        [builds]
    );

    return { builds, createBuild, updateBuild, getBuild, isLoading };
}
