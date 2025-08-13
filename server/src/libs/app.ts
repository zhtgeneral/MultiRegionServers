import express from 'express';
import http from 'http';
import cors from 'cors';

export const app = express();
export const server = http.createServer(app);

app.use(cors({
  origin: "*",
  credentials: true,
  methods: ["GET", "POST"]
}))