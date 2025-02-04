package org.tools.mysystem.service.app.utils;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.NodeList;

public class XMLLoader {
    private static final Logger logger = LoggerFactory.getLogger(XMLLoader.class);

    /**
     * load xml file
     * 
     * @param data
     */
    public void load(String data, CallbackData callbackData) {
        try {
            logger.info("Loading xml ...");
            DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
            DocumentBuilder builder = factory.newDocumentBuilder();

            // Load xml file
            File xmlFile = toFile(data);
            Document document = builder.parse(xmlFile);
            xmlFile.delete();

            document.getDocumentElement().normalize();

            Element root = document.getDocumentElement();
            logger.info("Loading xml root {} {}", root.getNodeName(), root.getElementsByTagName("graph").getLength());

            walk(root.getChildNodes(), new Callback() {
                @Override
                public void onCompleteTag(String name, String text, Map<String, String> map) {
                    switch (name) {
                        case "graph":
                            logger.trace("[GRAPH] text: {} attrs:{}", text, map);
                            callbackData.onCompleteGraph("", map.get("style"));
                            break;

                        case "node":
                            logger.trace("[NODE] text: {} attrs:{}", text, map);
                            callbackData.onCompleteNode(map.get("id"), map.get("label"), Integer.parseInt(map.get("x")),
                                    Integer.parseInt(map.get("y")), map.get("alias"), map.get("group"),
                                    map.get("tag"), map.get("cdata"));
                            break;

                        case "edge":
                            logger.trace("[EDGE] text: {} attrs:{}", text, map);
                            callbackData.onCompleteEdge(map.get("id"), map.get("label"), map.get("source"),
                                    map.get("target"),
                                    map.get("tag"));
                            break;

                        default:
                            logger.trace("[UNKNOWN] name: {} text: {} attrs:{}", name, text, map);
                            break;
                    }
                }
            });
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private void walk(NodeList nodeList, Callback callback) {
        for (int i = 0; i < nodeList.getLength(); i++) {
            var node = nodeList.item(i);
            Map<String, String> map = new HashMap<String, String>();
            if (node.hasAttributes()) {
                for (int a = 0; a < node.getAttributes().getLength(); a++) {
                    map.put(node.getAttributes().item(a).getNodeName(), node.getAttributes().item(a).getTextContent());
                }
            }
            callback.onCompleteTag(node.getNodeName(), node.getTextContent(), map);
            if (node.hasChildNodes()) {
                walk(node.getChildNodes(), callback);
            }
        }
    }

    public void loadFile(File file, CallbackData callbackData) throws IOException {
        load(toString(file), callbackData);
    }

    private String toString(File file) throws IOException {
        StringBuilder fileContent = new StringBuilder();

        try (BufferedReader br = new BufferedReader(new FileReader(file.getAbsolutePath()))) {
            String line;
            while ((line = br.readLine()) != null) {
                fileContent.append(line).append("\n");
            }
        } catch (IOException e) {
            throw e;
        }

        return fileContent.toString();
    }

    private File toFile(String content) throws IOException {
        var file = File.createTempFile("tmp", ".xml");

        try (BufferedWriter writer = new BufferedWriter(new FileWriter(file.getAbsolutePath()))) {
            writer.write(content);
            return file;
        } catch (IOException e) {
            throw e;
        }
    }
}
