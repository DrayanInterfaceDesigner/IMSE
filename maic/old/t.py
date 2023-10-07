class TreeNode:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

def display_tree(root, depth=0):
    if root is not None:
        # Print spaces as a prefix based on the depth of the node
        print("   " * depth, end="")
        
        # Print the node's value
        print(root.value)
        
        # Recursively display the left and right subtrees
        display_tree(root.left, depth + 1)
        display_tree(root.right, depth + 1)

def build_tree_from_list(values, index=0):
    if index < len(values):
        if values[index] is None:
            return None
        node = TreeNode(values[index])
        node.left = build_tree_from_list(values, 2 * index + 1)
        node.right = build_tree_from_list(values, 2 * index + 2)
        return node

# Example usage:
if __name__ == "__main__":
    # Create a sample binary tree using a list of values
    values = [10, "a", "b", None, None, "c", "d"]
    root = build_tree_from_list(values)
    
    # Display the binary tree
    display_tree(root)



class TreeNode:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

def print_tree_recursive(node):
    if node is None:
        return ("", "")
    
    if node.left is None and node.right is None:
        # If it's a leaf node, return its value and spacing
        return (str(node.value), " " * 5)
    
    left_tree, left_spacing = print_tree_recursive(node.left)
    right_tree, right_spacing = print_tree_recursive(node.right)
    
    # Create strings for bars and characters
    bars = " / " if node.left else "   "
    chars = str(node.value) if node.value is not None else " "
    
    # Combine strings and spacing for left and right subtrees
    tree_str = left_tree + bars + right_tree
    spacing = left_spacing + " " + chars + " " + right_spacing
    
    return (tree_str, spacing)

# Example usage:
if __name__ == "__main__":
    # Create a sample binary tree using a list of values
    values = [1, 2, 3, None, None, 4, 5]
    root = build_tree_from_list(values)
    
    # Display the binary tree using the recursive function
    tree_str, _ = print_tree_recursive(root)
    print(tree_str)
