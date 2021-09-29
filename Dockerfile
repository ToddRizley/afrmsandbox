FROM python:3
ENV APIPUB $AFRMPUBAPI
ENV APIPRIV $AFRMPRIVAPI

WORKDIR /app
COPY requirements.txt requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

COPY . .


ENTRYPOINT [ "python3" ]

CMD [ "app.py" ]