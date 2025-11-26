#!/bin/bash
cd /home/kavia/workspace/code-generation/mcva-digital-template-system-2287-2296/mcva_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

