# Sử dụng Node.js 22 làm base image
FROM node:22-alpine

# Thiết lập thư mục làm việc
WORKDIR /app

# Copy package files
COPY package.json yarn.lock ./

# Cài đặt dependencies
RUN yarn install --frozen-lockfile

# Copy toàn bộ source code
COPY . .

# Expose port
EXPOSE 3000

# Chạy ứng dụng
CMD ["yarn", "start"]
