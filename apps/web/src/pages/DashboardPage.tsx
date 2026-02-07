import { useBuilds } from "@/hooks/useBuilds";
import { Box, Flex, Grid, Heading, Text, VStack } from "@chakra-ui/react";
import { FiPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";

export function DashboardPage() {
    const { builds, createBuild, isLoading } = useBuilds();
    const navigate = useNavigate();

    const handleCreateBuild = useCallback(() => {
        const id = createBuild("New Untitled Build");
        navigate(`/builder/${id}`);
    }, [createBuild, navigate]);

    const handleOpenBuild = useCallback(
        (id: string) => {
            navigate(`/builder/${id}`);
        },
        [navigate]
    );

    if (isLoading) {
        return (
            <Flex
                height="100vh"
                width="100vw"
                alignItems="center"
                justifyContent="center"
            >
                <Text>Loading builds...</Text>
            </Flex>
        );
    }

    return (
        <Box padding={8} height="100vh" width="100vw" bgColor="bg.muted">
            <VStack align="start" gap={6} width="100%">
                <Heading size="2xl">Dashboard</Heading>

                <Box width="100%">
                    <Heading size="lg" marginBottom={4}>
                        Recent Builds
                    </Heading>

                    <Grid
                        templateColumns="repeat(auto-fill, minmax(280px, 1fr))"
                        gap={6}
                    >
                        {/* New Build Card */}
                        <Box
                            borderWidth="2px"
                            borderStyle="dashed"
                            borderColor="border.emphasized"
                            borderRadius="xl"
                            padding={6}
                            cursor="pointer"
                            bg="bg.panel"
                            _hover={{
                                borderColor: "purple.500",
                                bg: "bg.subtle",
                            }}
                            onClick={handleCreateBuild}
                            height="200px"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            transition="all 0.2s"
                        >
                            <VStack gap={2}>
                                <Box
                                    padding={3}
                                    borderRadius="full"
                                    bg="purple.subtle"
                                    color="purple.fg"
                                >
                                    <FiPlus size={24} />
                                </Box>
                                <Text fontWeight="medium">
                                    Create New Build
                                </Text>
                            </VStack>
                        </Box>

                        {/* Recent Builds */}
                        {builds.map((build) => (
                            <Box
                                key={build.id}
                                borderWidth="1px"
                                borderColor="border"
                                borderRadius="xl"
                                padding={6}
                                cursor="pointer"
                                bg="bg.panel"
                                _hover={{
                                    borderColor: "purple.500",
                                    shadow: "md",
                                }}
                                onClick={() => handleOpenBuild(build.id)}
                                height="200px"
                                display="flex"
                                flexDirection="column"
                                justifyContent="space-between"
                                transition="all 0.2s"
                            >
                                <VStack align="start" gap={2}>
                                    <Heading size="md" lineClamp={2}>
                                        {build.name}
                                    </Heading>
                                    <Text
                                        fontSize="sm"
                                        color="fg.muted"
                                        lineClamp={3}
                                    >
                                        {build.nodes.length} components ·{" "}
                                        {build.edges.length} connections
                                    </Text>
                                </VStack>
                                <Text fontSize="xs" color="fg.subtle">
                                    Last edited{" "}
                                    {new Date(
                                        build.updatedAt
                                    ).toLocaleDateString()}
                                </Text>
                            </Box>
                        ))}
                    </Grid>
                </Box>
            </VStack>
        </Box>
    );
}
