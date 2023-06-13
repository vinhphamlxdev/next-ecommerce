export default function convertToRelativePath(absolutePath: string) {
  const relativePath = absolutePath.replace("D:/uploads", "/images/");
  return relativePath;
}
