const parseFileName = (fileName: String): String => {
  if (fileName.length < 22) {
    return fileName;
  }
  return fileName.slice(0, 10) + '...' + fileName.slice(-10);
};

export { parseFileName };
