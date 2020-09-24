FROM nikolaik/python-nodejs:latest

WORKDIR /app

COPY ./newserver ./

RUN ls -a
RUN cat package.json
RUN npm install 
RUN pip install --upgrade pip && \
    pip install -r requirements.txt

CMD ["npm", "start"]
EXPOSE 3001
