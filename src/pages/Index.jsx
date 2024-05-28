import { Box, Container, Flex, Heading, Text, VStack, HStack, Link, Spacer, Button, IconButton, useToast, AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay } from "@chakra-ui/react";
import { FaHome, FaUser, FaEnvelope, FaMoon, FaSun, FaTrash } from "react-icons/fa";
import { useEffect, useState, useRef } from "react";
import { Link as RouterLink } from "react-router-dom";

const Index = ({ toggleColorMode, colorMode }) => {
  const [posts, setPosts] = useState([]);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);
  const cancelRef = useRef();
  const toast = useToast();

  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem("posts")) || [];
    setPosts(storedPosts);
  }, []);

  const handleDeletePost = () => {
    const updatedPosts = posts.filter((post, index) => index !== postToDelete);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
    setPosts(updatedPosts);
    setIsDeleteDialogOpen(false);
    toast({
      title: "Post deleted.",
      description: "The post has been successfully deleted.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  const openDeleteDialog = (index) => {
    setPostToDelete(index);
    setIsDeleteDialogOpen(true);
  };

  return (
    <Container maxW="container.xl" p={4}>
      {/* Navigation Bar */}
      <Flex as="nav" bg={colorMode === "light" ? "gray.800" : "gray.900"} color="white" p={4} mb={8} align="center">
        <Heading size="md">My Blog</Heading>
        <Spacer />
        <HStack spacing={4}>
          <Link as={RouterLink} to="/" display="flex" alignItems="center">
            <FaHome />
            <Text ml={2}>Home</Text>
          </Link>
          <Link as={RouterLink} to="#" display="flex" alignItems="center">
            <FaUser />
            <Text ml={2}>About</Text>
          </Link>
          <Link as={RouterLink} to="#" display="flex" alignItems="center">
            <FaEnvelope />
            <Text ml={2}>Contact</Text>
          </Link>
        <IconButton
            icon={colorMode === "light" ? <FaMoon /> : <FaSun />}
            isRound
            size="md"
            alignSelf="center"
            onClick={toggleColorMode}
            aria-label="Toggle dark mode"
          />
        </HStack>
      </Flex>

      {/* Main Content Area */}
      <Flex direction={{ base: "column", md: "row" }} align="start">
        {/* Blog Posts */}
        <Box flex="3" p={4}>
          <Button as={RouterLink} to="/add-post" colorScheme="teal" mb={4}>Add New Post</Button>
          <VStack spacing={8} align="stretch">
            {posts.map((post, index) => (
              <Box key={index} p={5} shadow="md" borderWidth="1px">
                <Flex justify="space-between" align="center">
                  <Heading fontSize="xl">{post.title}</Heading>
                  <IconButton
                    icon={<FaTrash />}
                    colorScheme="red"
                    onClick={() => openDeleteDialog(index)}
                    aria-label="Delete post"
                  />
                </Flex>
                <Text mt={4}>{post.content}</Text>
                <Text mt={2} fontSize="sm" color="gray.500">Tags: {post.tags.join(", ")}</Text>
              </Box>
            ))}
          </VStack>
        </Box>

        {/* Sidebar */}
        <Box flex="1" p={4} bg={colorMode === "light" ? "gray.50" : "gray.700"} ml={{ md: 4 }} mt={{ base: 4, md: 0 }}>
          <VStack spacing={4} align="stretch">
            <Box p={5} shadow="md" borderWidth="1px">
              <Heading fontSize="lg">About Me</Heading>
              <Text mt={4}>This is a brief description about the blog author.</Text>
            </Box>
            <Box p={5} shadow="md" borderWidth="1px">
              <Heading fontSize="lg">Categories</Heading>
              <Text mt={4}>Category 1</Text>
              <Text mt={2}>Category 2</Text>
              <Text mt={2}>Category 3</Text>
            </Box>
            <Box p={5} shadow="md" borderWidth="1px">
              <Heading fontSize="lg">Follow Me</Heading>
              <Text mt={4}>Links to social media profiles.</Text>
            </Box>
          </VStack>
        </Box>
      </Flex>
    <AlertDialog
        isOpen={isDeleteDialogOpen}
        leastDestructiveRef={cancelRef}
        onClose={() => setIsDeleteDialogOpen(false)}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Post
            </AlertDialogHeader>
            <AlertDialogBody>
              Are you sure you want to delete this post? This action cannot be undone.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={() => setIsDeleteDialogOpen(false)}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleDeletePost} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Container>
  );
};

export default Index;